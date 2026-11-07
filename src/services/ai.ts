export interface AnalysisRequest {
  platform: string;
  noticeText: string;
}

export interface TaskItem {
  title: string;
  detail: string;
  timeframe: string;
}

export interface AnalysisResponse {
  moneySafety: string;
  accessStatus: string;
  concernLevel: string;
  firstAction: string;
  summary: string;
  tasks: TaskItem[];
}

export async function analyzeAccountNotice(req: AnalysisRequest): Promise<AnalysisResponse> {
  try {
    // هنا بنبعت الطلب للسيرفر بتاعنا (Vercel) عشان المفتاح يفضل مستخبي
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error('فشل في الاتصال بالسيرفر');
    }

    return await response.json();
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
}