export interface Attachment {
  url: string;
  filename: string;
  contentType: string;
}

export interface DialogMessage {
  questionText: string;
  questionAttachments: Attachment[];
  answerText: string;
  answerAttachments: Attachment[];
}

export interface ScriptedDialog {
  id: string;
  title: string;
  messages: DialogMessage[];
  sortOrder: number;
  createdAt: string;
}

export type TestResult = {
  status: "ok" | "fail" | "testing";
  got?: string;
  gotAttachments?: Attachment[];
};

export const emptyMessage = (): DialogMessage => ({
  questionText: "",
  questionAttachments: [],
  answerText: "",
  answerAttachments: [],
});
