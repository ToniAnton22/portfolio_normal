import { ProjectDisplaySchema } from '$lib/types';
import type { ProjectDisplay, ProjectLLM, InfoKey } from '$lib/types';
import { supabase } from '$lib/server/supabase/supabaseClient';
type View = 'display' | 'llm';

export async function selectedInfo(
	keys: InfoKey | InfoKey[],
	view: View
): Promise<ProjectDisplay | ProjectLLM | (ProjectDisplay | ProjectLLM)[]> {
	const keyList = Array.isArray(keys) ? keys : [keys];

	if (view === 'display') {
		const { data, error } = await supabase.rpc('get_projects_public');
		if (error) throw new Error(`get_projects_public failed: ${error.message}`);

		const map = new Map<string, any>((data ?? []).map((p: any) => [p.key, p]));

		const result = keyList.map((k) => {
			const project = map.get(k);
			if (!project) throw new Error(`Project not found: ${k}`);
			return ProjectDisplaySchema.parse(project);
		});

		return Array.isArray(keys) ? result : result[0];
	}

	const { data, error } = await supabase
		.from('projects')
		.select('key, llm')
		.in('key', keyList);

	if (error) throw new Error(`projects select failed: ${error.message}`);

	const map = new Map<string, any>((data ?? []).map((p: any) => [p.key, p.llm]));

	const result = keyList.map((k) => {
		const llm = map.get(k);
		if (!llm) throw new Error(`LLM payload not found for project: ${k}`);
		return llm as ProjectLLM;
	});

	return Array.isArray(keys) ? result : result[0];
}
