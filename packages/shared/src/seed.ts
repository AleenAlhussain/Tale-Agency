/* Starting content for the database. The API seeds from these files the first time it runs,
   and the website falls back to them if the API cannot be reached. */
import type { ArchiveProjectDTO, CaseStudyDTO } from './types';
import projects from './seed/projects.json';
import caseStudies from './seed/case-studies.json';

export const SEED_PROJECTS = projects as ArchiveProjectDTO[];
export const SEED_CASE_STUDIES = caseStudies as CaseStudyDTO[];
