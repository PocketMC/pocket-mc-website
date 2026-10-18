export interface ProofPoint {
  title: string;
  desc: string;
  file?: string;
  code?: string;
}

export interface ProofModalData {
  tool: string;
  title: string;
  points: ProofPoint[];
}

export interface LightboxData {
  src: string;
  label: string;
  title: string;
  alt: string;
  onPrev?: () => void;
  onNext?: () => void;
}
