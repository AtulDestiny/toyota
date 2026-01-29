import * as iam from "aws-cdk-lib/aws-iam";
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { storage } from "./storage/resource.js";
import { getVehicleByCategoryFunction } from './functions/get-vehicles-by-category/resource.js';
import { getDealershipQuotationFunction } from './functions/dealership-quotation/resource';
import { getProductsByCategoryFunction } from './functions/get-products-by-category/resource.js';
import { getDealershipCredFunction } from './functions/get-dealership-cred/resource';
import { proxyFunction } from './functions/proxy/resource.js';
import { AuthorizationType, Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { fetchDealershipUsedVehicleFunction } from './functions/get-dealership-used-vehicle/resource';
import { createUserInCognito } from './functions/create-user-in-cognito/resource';
import { Stack } from "aws-cdk-lib";
import { getVehicleListFunction } from "./functions/get-vehicle-list/resource.js";

const backend = defineBackend({
  auth,
  data,
  storage,

  // queries
  getVehicleByCategoryFunction,
  getProductsByCategoryFunction,

  // dealership fucntion 
  getDealershipCredFunction,
  fetchDealershipUsedVehicleFunction,

  // dealership quotation function
  getDealershipQuotationFunction,

  // get vehciles based on the category from agent motor
  getVehicleListFunction,
  
  // create user In Cognito
  createUserInCognito,

  // mutations
  proxyFunction,
});

// Access the S3 bucket
// const s3Bucket = backend.storage.resources.bucket;

// s3Bucket.addToResourcePolicy(new iam.PolicyStatement({
//   effect: iam.Effect.ALLOW,
//   principals: [new iam.ArnPrincipal('*')], // Allows any principal
//   actions: ['s3:GetObject'], // Action to allow
//   resources: [`arn:aws:s3:::${s3Bucket.bucketName}/*`], // Resource to apply the policy
// }));

// create a new API stack
const apiStack = backend.createStack("api-stack");

// create a new REST API
const myRestApi = new RestApi(apiStack, "RestApi", {
  restApiName: "toyota-api",
  deploy: true,
  deployOptions: {
    stageName: "prod",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key", "X-Amz-Security-Token"],
  },
});

// create a new Lambda integration
const getVehicleByCategoryIntegration = new LambdaIntegration(
  backend.getVehicleByCategoryFunction.resources.lambda
);

const getProductsByCategoryIntegration = new LambdaIntegration(
  backend.getProductsByCategoryFunction.resources.lambda
);

const proxyIntegration = new LambdaIntegration(
  backend.proxyFunction.resources.lambda
);

const getDealershipCredIntegration = new LambdaIntegration(
  backend.getDealershipCredFunction.resources.lambda
);

const getVehicleListFromAgentMotor = new LambdaIntegration(
  backend.getVehicleListFunction.resources.lambda
);

const fetchDealershipUsedVehicleIntegration = new LambdaIntegration(
  backend.fetchDealershipUsedVehicleFunction.resources.lambda
);

// ✅ NEW integration for getDealershipQuotationFunction
const getDealershipQuotationIntegration = new LambdaIntegration(
  backend.getDealershipQuotationFunction.resources.lambda
);

const createUserInCognitoIntegration = new LambdaIntegration(
  backend.createUserInCognito.resources.lambda
);

// create a new resource path with API Key authorization
const getDealershipCredPath = myRestApi.root.addResource("getDealershipCred", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE, // You can change this to API_KEY or IAM if needed
  },
});

const getVehicleFromAgentmotorCredPath = myRestApi.root.addResource("getVehicleList", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE, // You can change this to API_KEY or IAM if needed
  },
});

// create a new resource path with API Key authorization
const getDealershipUsedVehiclePath = myRestApi.root.addResource("getDealershipUsedVehicle", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE, // You can change this to API_KEY or IAM if needed
  },
});

// NEW resource path for quotation
const createUserInCognitoPath = myRestApi.root.addResource("createUserInCognito", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE,
  },
});

const getDealershipQuotationPath = myRestApi.root.addResource("getDealershipQuotation", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE,
  },
});

// create a new resource path with API Key authorization
const getVehicleByCategoryPath = myRestApi.root.addResource("getVehicleByCategory", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE,
  },
});

// create a new resource path for products by category
const getProductsByCategoryPath = myRestApi.root.addResource("getProductsByCategory", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE,
  },
});

// create a new resource path for proxy
const proxyPath = myRestApi.root.addResource("proxy", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE,
  },
});

// add POST method to the resource path
getVehicleByCategoryPath.addMethod("POST", getVehicleByCategoryIntegration);

// add POST method to the products by category resource path
getProductsByCategoryPath.addMethod("POST", getProductsByCategoryIntegration);

// add POST method to the dealership by category resource path
getDealershipCredPath.addMethod("POST", getDealershipCredIntegration);

// Get all vehicles from agent motor
getVehicleFromAgentmotorCredPath.addMethod("POST", getVehicleListFromAgentMotor);

// add POST method to the dealership by category resource path
getDealershipUsedVehiclePath.addMethod("POST", fetchDealershipUsedVehicleIntegration);

//  Add POST method for getDealershipQuotationFunction
getDealershipQuotationPath.addMethod("POST", getDealershipQuotationIntegration);

createUserInCognitoPath.addMethod("POST", createUserInCognitoIntegration);


// add POST method to the proxy resource path
proxyPath.addMethod("POST", proxyIntegration);
proxyPath.addMethod("GET", proxyIntegration);

backend.createUserInCognito.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: [
      "cognito-idp:AdminCreateUser",
      "cognito-idp:AdminSetUserPassword",
      "cognito-idp:AdminAddUserToGroup",
      "cognito-idp:AdminRemoveUserFromGroup",
      "cognito-idp:AdminDisableUser",
      "cognito-idp:AdminEnableUser",
      "cognito-idp:AdminUpdateUserAttributes",
      "cognito-idp:AdminListGroupsForUser",
      "cognito-idp:ListUsers",
      "cognito-idp:AdminGetUser"
    ],
    resources: [
      "arn:aws:cognito-idp:us-east-2:379175722442:userpool/us-east-2_EhaMuqLKt"
    ],
  })
);
// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [myRestApi.restApiName]: {
        endpoint: myRestApi.url,
        region: Stack.of(myRestApi).region,
        apiName: myRestApi.restApiName,
      },
    },
  },
});