/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { Assertion } from 'chai';

Then('user select test data tab', () => {
  cy.get('[name="TestData"]', { timeout: 20000 }).click({ force: true });
});

When('user adds new testdata', () => {
  cy.log('I am here');
  cy.get('[name="TestData"]').click({ force: true });
  //Add Data Stream with mandatory fields
  cy.addDataStream_M('demoStream');
  // Edit data stream with left tree
  cy.editDataStream_L('demoStream');
  // Copy data stream with left tree
  cy.copyDataStream_L('demoStream');
  // delete data stream with left tree
  cy.deleteDataStream_L('demoStream');
  cy.wait(3000);
  cy.get(':nth-child(1) > .title').click({ force: true });
  cy.deleteDataStream_L('copyStream');
  cy.wait(3000);
  //Add Data Stream with mandatory fields and optional fields
  cy.addDataStream_O('demoStream2');
  // Edit data stream with right tree
  cy.editDataStream_R('demoStream2');
  //   // Copy data stream with right tree
  cy.copyDataStream_R('demoStream');
  //   // delete data stream with right tree
  cy.deleteDataStream_R('demoStream2');
  cy.wait(3000);
  cy.get(':nth-child(1) > .title').click({ force: true });
  cy.deleteDataStream_L('copyStream2');
});

When('user add new segment', () => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  cy.get(':nth-child(1) > .title').click({ force: true });
  cy.wait(2000);
  const segmentFile = 'cypress\\support\\segLoad.csv';
  const segments = [
    { name: 'demoSeg1' },
    { name: 'demoSeg2' },
    { name: 'demoSeg3' },
    { name: 'demoSeg4' }
  ];
  cy.configureSegments(segmentFile, segments);
  cy.wait(3000);
  cy.deleteDataStream_L('demoStream');
  cy.configureSegments_M(segmentFile, segments);
  cy.wait(3000);
  cy.deleteDataStream_L('demoStream');
  cy.configureSegments_O(segmentFile, segments);
  cy.wait(3000);
  cy.deleteDataStream_L('demoStream');
});
When('user delete data stream', () => {
  cy.wait(2000);
});
When('user adds non data stream', () => {
  cy.get('[name="TestData"]').click({ force: true });
  const csv = 'cypress\\support\\SportsSet.csv';
  cy.addDataStream_Non_Time('demoNonTimeStream', csv);
  cy.editDataStream_Non_Time('demoNonTimeStream', csv);
  cy.deleteDataStream_Non_Time('demoNonTimeStream');
});

When('user adds new doppel image', () => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  const zipFile = 'cypress\\support\\linuxtruckv1.zip';
  // testDoppelImageCombinations(zipFile);
  cy.testDoppelImageCombinationsForOS('Linux', zipFile);
  cy.deleteVmImages();
  // cy.testDoppelImageCombinationsForOS('Windows', zipFile);
});
When('user delete doppel image', () => {
  cy.deleteVmImages_R();
});

// Add a new protobuf spec
When('user adds a new protobuf spec', () => {
  const protoFile = 'cypress\\support\\TestBuild.proto';
  // const protoFilePath = 'cypress/support/protoFile.proto'; // Path to the proto file
  let versionNumber = '500'; // Version of the file
  let description = 'Sample protobuf specification file'; // Description of the file

  // Call the custom command
  cy.uploadProtoFile(protoFile, versionNumber);
  cy.get('textarea[name="description"]').type(description, { force: true });
  // Submit the form
  cy.get('button[type="submit"]').click({ force: true });
  cy.contains('Success', { timeout: 60000 });
  // cy.get('#button > :nth-child(2)').click({ force: true });
  cy.contains('Protobuf Spec').click({ force: true });
  //delete protobuf
  const protoSpecTitle = 'testbuild-V500'; // Title of the protobuf spec to delete

  //   // Call the custom command
  cy.deleteProtoSpec(protoSpecTitle);
  cy.wait(3000);
  cy.contains('Protobuf Spec').click({ force: true });
  cy.log('i am here');

  cy.uploadProtoFile(protoFile, versionNumber);
  cy.get('textarea[name="description"]').type(description, { force: true });
  cy.get('textarea[name="description"]').clear({ force: true });
  cy.wait(3000);
  cy.get('button[type="submit"]').click({ force: true });
  cy.contains('Success', { timeout: 60000 });
  // cy.get('#button > :nth-child(2)').click({ force: true });
  cy.contains('Protobuf Spec').click({ force: true });
  cy.deleteProtoSpec_R(protoSpecTitle);
  cy.wait(3000);
  cy.contains('Protobuf Spec').click({ force: true });

  cy.uploadProtoFile(protoFile, versionNumber);
  cy.get('input[name="versionNumber"]').clear({ force: true });
  cy.get('textarea[name="description"]').type(description, { force: true });
  cy.get('textarea[name="description"]').clear({ force: true });
  cy.wait(3000);
  cy.get('button[type="submit"]').click({ force: true });
  cy.wait(3000);
  cy.get('i[class="fi-times"]').click({ force: true });
});
// Delete the new protobuf spec
Then('user deletes the new protobuf spec', () => {});

// Add a new UDF
When('user adds a new UDF', () => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  const udfFile = 'cypress\\support\\test 3.js';
  cy.contains('User Defined Scripts').click({ force: true });
  const udfName = 'udf1';
  const udfDescription = 'test';

  // Call the custom command
  cy.uploadUDFScript(udfFile, udfName, udfDescription);
  cy.contains('User Defined Script added successfully');
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.edit_L(udfName, udfFile);
  cy.delete_L(udfName);

  cy.uploadUDFScript(udfFile, udfName, udfDescription);
  cy.contains('User Defined Script added successfully');
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.edit_R(udfName, udfFile);
  cy.delete_R(udfFile);
});

// Duplicate the UDF
Then('user duplicates the UDF', () => {});

// Delete the new Doppel image
Then('user download VM Doppel image', () => {
  cy.fixture('DownloadLogs').then((value) => {
    Url = value.url;
    Username = value.username;
    cy.visit(value.url);
    cy.wait(9000);
    cy.get('input[placeholder="Username"]').type(value.username, {
      force: true
    });
    cy.get('#verify-button').click({ force: true });
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.text().includes('Session Already Active')) {
        cy.contains('Yes').click({ force: true });
        cy.contains('OK').click({ force: true });
        cy.get('#verify-button').click({ force: true });
      } else {
      }
    });
    cy.get('input[placeholder="Password"]').type(value.password, {
      force: true
    });
    cy.contains('Login').click({ force: true });
    cy.get('[name="Doppel Models"]', { timeout: 1000000 }).click({
      force: true
    });
    cy.wait(2000);
  });
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  cy.contains('VM Doppel Images').click({ force: true });
  //right side
  cy.get('i[class="fi-document-download"]').click({ force: true });
  cy.get('button[type="submit"]').click({ force: true });
  cy.contains('The File You Have Requested has Started Downloading', {
    timeout: 4000
  });
  // cy.get('i[class="fi-check text-sm"]').click({ force: true });
  cy.wait(2000);
  //left side
  cy.downloadVMImage_L('activator');
});

Then('user download protobuf spec', () => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  cy.contains('Protobuf Spec').click({ force: true });
  cy.get('i[class="fi-document-download"]').click({ force: true });
  cy.get('button[type="submit"]').click({ force: true });
  cy.contains('The File You Have Requested has Started Downloading', {
    timeout: 4000
  });
  // cy.get('i[class="fi-check text-sm"]').click({ force: true });
  cy.downloadProtobuf_L('c2dtestnew-V1');
});

When('a user adds a non-time series stream to a test step', () => {
  //Add a doppel model with no datapoints and attributes  : nonTimeSeries
  //Add a non time series stream : nonTimeSeriesStream
});
