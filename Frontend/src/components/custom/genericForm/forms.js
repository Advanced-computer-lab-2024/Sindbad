/*
    Forms for the generic form component should be generated based on this object:

    {
        zodSchema: *import your zod schema made in form-schemas and put it here*,
        renderedFields: *define the fields you want to render in the form, including the type of input fields you want.*,
        defaultValues: *define the default values for the fields in the form*,
        onSubmit: *define the function that should be called when the form is submitted*,
    }
    
    You should avoid defining the form schema, fields, and other form-related data in this component. 
    Instead, create a separate file to define the form schema and other related data, and then import it into the component.

    For zod schemas, define them in the form-schemas folder.
    For adding input fields, define them in the input-fields folder.
    For renderedFields, define them in the rendered-fields folder along with defaultValues (I don't think theres any need for that much separation of concerns).

    In this file, we'll only define a map that has objects based on the above structure.
*/

import { 
    touristSchema, 
    tourGuideSchema, 
    sellerSchema, 
    advertiserSchema,
    itinerarySchema,
    productSchema,
    activitySchema,
    siteSchema,
    companyProfileSchema,
    previousWorkSchema
  } from './form-schemas';
  
  import {
    createTourist,
    updateTourist,
    createTourGuide,
    updateTourGuide,
    createSeller,
    updateSeller,
    createAdvertiser,
    updateAdvertiser,
    createItinerary,
    updateItinerary,
    createProduct,
    updateProduct,
    createActivity,
    updateActivity,
    createSite,
    updateSite
  } from '@/services/ApiHandlers';
  
  import {tourist} from './rendered-fields/touristFields';
  import {activity} from './rendered-fields/activityFields';
  import {site} from './rendered-fields/siteFields';
  import {product} from './rendered-fields/productFields';

  export const forms = {
    tourist: {
      zodSchema: touristSchema,
      renderedFields: tourist.fields,
      defaultValues: tourist.defaultValues,
      onSubmit: (values, id) => {
        if (id) {
          return updateTourist(id, values);
        }
        return createTourist(values);
      }
    },
  
    activity: {
      zodSchema: activitySchema,
      renderedFields: activity.fields,
      defaultValues: activity.defaultValues,
      onSubmit: (values, id) => {
        if (id) {
          return updateActivity(id, values);
        }
        return createActivity(values);
      }
    },
  
    site: {
      zodSchema: siteSchema,
      renderedFields: site.fields,
      defaultValues: site.defaultValues,
      onSubmit: (values, id) => {
        if (id) {
          return updateSite(id, values);
        }
        return createSite(values);
      }
    },
  
    product: {
      zodSchema: productSchema,
      renderedFields: product.fields,
      defaultValues: product.defaultValues,
      onSubmit: (values, id) => {
        if (id) {
          return updateProduct(id, values);
        }
        return createProduct(values);
      }
    }
  };