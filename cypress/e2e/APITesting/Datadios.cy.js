import { USER_EMAIL, USER_PASSWORD } from "../constants";
 
const payload = {
  job_name: "Workflow_DataDiff_20240304_150102",
  job_desc: "DataDiff Workflow, Creation Time: 2024-03-04 15:01:02",
  job_type: "DIFF",
  source_ds: "Snowflake_src",
  target_ds: "Snowflake_trgt",
  automap: false,
  mapped_objects: {
    "DEMO_DB:SNOWFLAKE_SOURCE:ALLSTRINGDATA_1": {
      source: "DEMO_DB:SNOWFLAKE_SOURCE:ALLSTRINGDATA_1",
      target: ["DEMO_DB:SNOWFLAKE_TARGET:ALLSTRINGDATA_1_ALLCLMDIFF"],
    },
    filter_params: {},
  },
};
 
const p =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTU2ODY4MywianRpIjoiYTM3MDI3YmQtZTFhMS00Y2Q1LWFkZWUtN2ZjYTk0MzEzZWE3IiwibmJmIjoxNzA5NTY4NjgzLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZW5kdG9lbmR0ZXN0QGRhdGFkaW9zLmNvbTpEZWZhdWx0VGVuYW50IiwiY3NyZiI6ImRhNjNjYWQ2LTkyNzctNDVmNC04NDg2LTUyYTQyZDg0ZjRkYyIsImV4cCI6MTcwOTc0MTQ4M30.MHV0Z_tXMDgTrRx0Qlz4PquGalNEn54kZIpsjtImpkU";
describe("DataDios api testing", () => {
  beforeEach(function () {
    cy.login(USER_EMAIL, USER_PASSWORD);
  });
 
  it.skip("smartdiff api testing", () => {
    cy.request({
      method: "GET",
      url: "https://testing.datadios.com/supported_types",
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
    });
  });
 
  it("smartdiff api testing", () => {
    cy.request({
      method: "POST",
      url: "https://testing.datadios.com/diff/diff_metadata",
      headers: {
        "X-CSRF-TOKEN": "da63cad6-9277-45f4-8486-52a42d84f4dc",
      },
      cookies: { access_token_cookie: p },
      body: payload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
    });
  });
});