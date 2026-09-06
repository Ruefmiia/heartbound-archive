import eventData from './events.json';

export type ArchiveSection = 'production' | 'promotion' | 'episodes' | 'materials';

export interface ArchiveEvent {
	id: string;
	date: string;
	day: string;
	monthZh: string;
	title: string;
	summary: string;
	type: string;
	tone: 'official' | 'participant' | 'unofficial';
	sections: ArchiveSection[];
	href?: string;
	/** 飞书或语雀的公开只读文档链接。 */
	archiveUrl?: string;
}

export const events = eventData as ArchiveEvent[];
