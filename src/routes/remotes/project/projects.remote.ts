import { query } from '$app/server';
import { z } from 'zod';
import { supabase } from '$lib/server/supabase/supabaseClient';


export const getProjectsPublic = query(async () => {
    const { data, error } = await supabase.rpc('get_projects_public');
    if (error) throw new Error(error.message);
    return data ?? [];
});

export const getProjectPublic = query(z.string(), async (key: string) => {
    const { data, error } = await supabase.rpc('get_projects_public');
    if (error) throw new Error(error.message);

    const project = (data ?? []).find((p: any) => p.key === key);
    if (!project) return null;

    return project;
});
