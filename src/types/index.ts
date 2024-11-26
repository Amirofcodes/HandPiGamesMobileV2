export type GameResponse = {
    message: string;
    new_letter?: string;
    score?: number;
    predicted_gesture?: string;
    expected_letter?: string;
    final_score?: number;
  };
  
  export type FrameData = {
    width: number;
    height: number;
    pixelFormat: string;
    bytesPerRow: number;
    data: string;
  };
  