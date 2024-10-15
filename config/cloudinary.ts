import { v2 as cloudinary } from 'cloudinary'
import { conf } from './config';

cloudinary.config({ 
cloud_name: conf.cloud_name, 
    api_key: conf.cloud_api,
    api_secret: conf.cloud_secret
  });

  export default cloudinary;

