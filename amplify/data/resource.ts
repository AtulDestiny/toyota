import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Country } from "../models/country";
import { City } from "../models/city";
import { Warranty } from "../models/warranty";
import { WarrantyByFeature } from "../models/warranty-by-feature";
import { Concessionaire } from "../models/concessionaire";
import { Model } from "../models/model";
import { ModelAttrib } from "../models/model-attrib";
import { ModelByYear } from "../models/model-by-year";
import { Office } from "../models/office";
import { Hour } from "../models/hour";
import { Category } from "../models/category";
import { Article } from "../models/article";
import { Gallery } from "../models/gallery";
import { GalleryByOffice } from "../models/gallery-by-office";
import { Partner } from "../models/partner";
import { Vehicle } from "../models/vehicle";
import { VehicleAttribs } from "../models/vehicle-attrib";
import { Color } from "../models/color";
import { ColorByModel } from "../models/color-by-model";
import { Document } from "../models/document";
import { DocumentByModel } from "../models/document-by-model";
import { PriceList } from "../models/price-list";
import { PriceListByFeature } from "../models/price-list-by-feature";
import { Step } from "../models/step";
import { RecruitmentByPartner } from "../models/recruitment-by-partner";
import { Recruitment } from "../models/recruitment";
import { Job } from "../models/job";
import { Competition } from "../models/competition";
import { Participation } from "../models/participation";
import { Winner } from "../models/winner";
import { Award } from "../models/award";
import { Product } from "../models/product";
import { ProductsAttrib } from "../models/products-attrib";
import { GetVehicleByCategory } from "./queries/get-vehicle-by-category.query";
import { GetProductsByCategory } from "./queries/get-products-by-category.query";
import { DefaultReturnType } from "./custom-types/default-response";
import { PriceListLine } from "../models/price-list-line";
import { Menu } from "../models/menu";
import { GalleryAsset } from "../models/gallery-asset";
import { Proxy } from "./mutation/proxy.mutation";
import { ProductReference } from "../models/ProductReference";
import { MainCategory } from "../models/MainCategory ";
import { VehicleCatalog } from "../models/VehicleCatalog";
import { DetailPageSlide } from "../models/DetailPageSlide";
import { DetailPageSlider } from "../models/DetailPageSlider";
import { ModelCategory } from "../models/ModelCategory";
import { UsedDealership } from "../models/used-dealership";
import { UsedModel } from "../models/used-model";
import { UsedVehicleAsset } from "../models/used-vehicle-asset";
import { UsedVehicle } from "../models/used-vehicle";
import { UsedModelVersion } from "../models/used-version";
import { SeoContent } from "../models/SeoContent";
import { UsedVehiclePresignedAsset } from "../models/UsedVehiclePresignedAsset";
import { CertificateRequest } from "../models/certificateRequests";

const schema = a.schema({
  // Return types
  DefaultReturnType,

  // Models
  Article,
  Award,
  ModelCategory,
  Category,
  MainCategory,
  City,
  Color,
  ColorByModel,
  Competition,
  Concessionaire,
  Country,
  Document,
  DocumentByModel,
  Gallery,
  GalleryByOffice,
  Hour,
  Job,
  Model,
  VehicleCatalog,
  ModelAttrib,
  ModelByYear,
  Office,
  Partner,
  Product,
  ProductReference,
  Participation,
  PriceList,
  PriceListByFeature,
  Recruitment,
  RecruitmentByPartner,
  Step,
  Vehicle,
  VehicleAttribs,
  Warranty,
  WarrantyByFeature,
  Winner,
  ProductsAttrib,
  PriceListLine,
  Menu,
  GalleryAsset,
  DetailPageSlide,
  DetailPageSlider,
  SeoContent,
  CertificateRequest,

  //usado
  UsedDealership,
  UsedModel,
  UsedVehicleAsset,
  UsedVehicle,
  UsedModelVersion,
  UsedVehiclePresignedAsset,

  // QUERIES
  GetVehicleByCategory,
  GetProductsByCategory,

  // MUTATIONS
  Proxy
})
  .authorization((allow) => [
    allow.publicApiKey(),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey'
  }
});