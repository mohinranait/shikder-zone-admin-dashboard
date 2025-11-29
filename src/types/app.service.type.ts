// types/integration.type.ts

export type EmailIntegration = {
  provider?: string;
  sendgrid_api_key?: string;
  sender_email?: string;
  sender_name?: string;
  isVerified?: boolean;
};

export type CloudinaryIntegration = {
  cloud_name?: string;
  api_key?: string;
  api_secret?: string;
};

export type FacebookPixelIntegration = {
  pixel_id?: string;
  access_token?: string;
  enable_tracking?: boolean;
};

export type Webhook = {
  eventType: string;
  endpointUrl: string;
  isActive: boolean;
};

export type AppIntegrationType = {
  _id?: string;
  email?: EmailIntegration;
  cloudinary?: CloudinaryIntegration;
  facebookPixel?: FacebookPixelIntegration;
  webhook?: Webhook[];
  createdAt?: string;
  updatedAt?: string;
};
