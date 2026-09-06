import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dataFile = fileURLToPath(new URL('../src/data/events.json', import.meta.url));
const endpoint = '/__heartbound/events';
const validTones = new Set(['official', 'participant', 'unofficial']);
const validSections = new Set(['production', 'promotion', 'episodes', 'materials']);
const chineseMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

function sendJson(res, status, body) {
	res.statusCode = status;
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('Cache-Control', 'no-store');
	res.end(JSON.stringify(body));
}

function validateEvent(event) {
	if (!event || typeof event !== 'object') return '缺少档案数据。';
	if (!/^\d{3,}$/.test(event.id)) return '档案编号应为至少三位数字。';
	if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) return '日期格式应为 YYYY-MM-DD。';
	if (!event.title?.trim() || !event.summary?.trim()) return '标题和摘要不能为空。';
	if (!validTones.has(event.tone)) return '信息类型无效。';
	if (!Array.isArray(event.sections) || event.sections.length === 0) return '至少选择一个所属栏目。';
	if (event.sections.some((section) => !validSections.has(section))) return '所属栏目无效。';
	return null;
}

export default function localEventsEditor() {
	return {
		name: 'heartbound-local-events-editor',
		hooks: {
			'astro:server:setup': ({ server, logger }) => {
				server.middlewares.use(async (req, res, next) => {
					if (req.url?.split('?')[0] !== endpoint) return next();

					if (req.method === 'GET') {
						const events = JSON.parse(await readFile(dataFile, 'utf8'));
						return sendJson(res, 200, { events });
					}
					if (req.method !== 'POST') return sendJson(res, 405, { error: '仅支持 GET 和 POST。' });

					try {
						let raw = '';
						for await (const chunk of req) {
							raw += chunk;
							if (raw.length > 100_000) return sendJson(res, 413, { error: '提交内容过大。' });
						}

						const { event } = JSON.parse(raw);
						const error = validateEvent(event);
						if (error) return sendJson(res, 400, { error });

						const events = JSON.parse(await readFile(dataFile, 'utf8'));
						const normalized = {
							...event,
							day: event.date.slice(8, 10),
							monthZh: chineseMonths[Number(event.date.slice(5, 7)) - 1],
							title: event.title.trim(),
							summary: event.summary.trim(),
							type: event.type.trim(),
							href: event.href?.trim() || undefined,
							archiveUrl: event.archiveUrl?.trim() || undefined,
						};

						const existingIndex = events.findIndex((item) => item.id === normalized.id);
						if (existingIndex >= 0) events[existingIndex] = normalized;
						else events.push(normalized);
						events.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
						await writeFile(dataFile, `${JSON.stringify(events, null, '\t')}\n`, 'utf8');
						return sendJson(res, 200, { ok: true, event: normalized });
					} catch (error) {
						logger.error(`保存档案失败：${error instanceof Error ? error.message : String(error)}`);
						return sendJson(res, 500, { error: '保存失败，请查看终端日志。' });
					}
				});
			},
		},
	};
}
