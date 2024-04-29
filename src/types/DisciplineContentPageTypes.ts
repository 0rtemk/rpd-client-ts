
interface DisciplineContent {
    theme: string;
    lectures: number;
    seminars: number;
    independent_work: number;
    competence: string;
    indicator: string;
    results: string;
  }

interface PlannedResults {
    competence: string;
    indicator: string;
    results: string;
}
  
export interface ObjectHours {  
    all: number;
    lectures: number;
    seminars: number;
    lect_and_sems: number;
    independent_work: number;
}
  
export interface DisciplineContentData {  
    [id: string]: DisciplineContent;
}

export interface PlannedResultsData {
    [id: string]: PlannedResults;
}