export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export interface Message {
  type:string,
  position:string,
  text:string,
  title:string
}

export type Role = "assistant" | "user";
