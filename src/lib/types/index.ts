import { z } from 'zod';

export const InfoKeySchema = z.enum([
	'dave',
	'whatsapp',
	'gtai',
	'donc',
	'planewiki',
	'davemcp',
	'other'
]);
export type InfoKey = z.infer<typeof InfoKeySchema>;

const Extras = z.object({
	image: z.string().optional(),
	demoLink: z.string().optional(),
	githubLink: z.string().optional(),
	featured: z.boolean().optional(),
	displayTags: z.array(z.string()).optional(),
	titleOverride: z.string().optional()
});

export type ExtrasType = z.infer<typeof Extras>;

export const ProjectFullSchema = z
	.object({
		key: InfoKeySchema,
		title: z.string().min(1),
		shortName: z.string().min(1).optional(), // e.g. "Dave DM"
		stack: z.array(z.string().min(1)).default([]),
		short_name: z.string().nullable().optional(),
		version: z.number().int().optional(),
		updated_at: z.string().optional(),

		// UI display fields
		description: z.string().min(1), // short / public
		highlights: z.array(z.string().min(1)).default([]),

		// CV/ATS fields
		skills: z.array(z.string().min(1)).default([]),
		atsKeywords: z.array(z.string().min(1)).default([]),
		details_md: z.string().optional(),
		// LLM-only payload (long)
		llm: z
			.object({
				overview: z.string().min(1).optional(),
				problem: z.string().min(1).optional(),
				solution: z.string().min(1).optional(),
				architecture: z.array(z.string().min(1)).default([]),
				techDetails: z.array(z.string().min(1)).default([]),
				cvBullets: z.array(z.string().min(1)).default([]),
				interviewTalkingPoints: z.array(z.string().min(1)).default([]),
				rawReadme: z.string().min(1).optional()
			})
			.default({ architecture: [], techDetails: [], cvBullets: [], interviewTalkingPoints: [] }),

		extras: Extras
	})
	.strict();

export type ProjectFull = z.infer<typeof ProjectFullSchema>;

export const ProjectDisplaySchema = ProjectFullSchema.pick({
	key: true,
	title: true,
	shortName: true,
	stack: true,
	description: true,
    short_name: true,
    version: true,
    updated_at: true,
	skills: true,
	details_md: true,
	highlights: true,
	extras: true
});

export type ProjectDisplay = z.infer<typeof ProjectDisplaySchema>;

export const ProjectLLMSchema = ProjectFullSchema; 
export type ProjectLLM = ProjectFull;

export const InfoMapSchema = z.record(InfoKeySchema, ProjectFullSchema);
export type InfoMap = z.infer<typeof InfoMapSchema>;

export const SelectedInfoArgsSchema = z
	.object({
		projectKey: InfoKeySchema,
		view: z.enum(['display', 'llm']).default('display')
	})
	.strict();

export type SelectedInfoArgs = z.infer<typeof SelectedInfoArgsSchema>;
