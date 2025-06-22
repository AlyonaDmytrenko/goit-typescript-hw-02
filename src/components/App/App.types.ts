export interface Photo {
  id: string;
  alt: string | undefined;
  description: string | undefined;
  urls: {
    regular: string;
    small: string;
    full: string;
  };
}
