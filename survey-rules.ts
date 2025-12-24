type Logic =
  | { if: { lt: number }; then: { action: "terminate"; message: string } }
  | { if: { in: number[] }; then: { action: "terminate"; message: string } };

type Option = { label: string; value: number; continue?: boolean; terminate?: boolean };

type Block =
  | { id: string; type: "screen"; required: true; text: string; programming?: Record<string, any> }
  | { id: string; type: "text_email"; required: true; question: string }
  | { id: string; type: "number"; required: true; question: string; validation: { min: number; max: number; integer_only: boolean }; logic?: Logic[] }
  | { id: string; type: "single_choice"; required: true; question: string; options: Option[]; programming?: Record<string, any>; logic?: Logic[] }
  | { id: string; type: "likert_1_5"; required: true; question: string; labels: string[]; values: number[]; programming?: Record<string, any>; help?: string }
  | { id: string; type: "ranking"; required: true; question: string; options: Option[]; programming?: Record<string, any> }
  | { id: string; type: "ranked_multi_select"; required: true; question: string; options: Option[]; programming?: Record<string, any> };

type Section = { id: string; title?: string; blocks: Block[] };

export const survey = {
  survey: {
    id: "apprecio_latam_motivacion_2026_v2",
    language: "es",
    settings: { all_required_by_default: true },
    sections: [] as Section[]
  }
};

// luego: survey.survey.sections.push(...)
// y al final: console.log(JSON.stringify(survey, null, 2));
