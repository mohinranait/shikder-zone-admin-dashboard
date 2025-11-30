// types/integration.type.ts

export type EmailIntegration = {
  provider: string,
  smtpPassword:string,
  smtpEmail: string,
  senderName: string,
  isActive: boolean,
  lastUpdated: string
};

export type CloudinaryIntegration = {
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
  isActive: boolean,
  lastUpdated: string
};

export type FacebookPixelIntegration = {
  pixelId?: string;
  accessToken?: string;
  enableTracking?: boolean;
  isActive?: boolean;
  lastUpdated: string
};



export type AppIntegrationType = {
  _id?: string;
  email?: EmailIntegration;
  cloudinary?: CloudinaryIntegration;
  facebookPixel?: FacebookPixelIntegration;
  createdAt?: string;
  updatedAt?: string;
};
