import { Angular2RealworldExampleAppMasterPage } from './app.po';

describe('angular2-realworld-example-app-master App', () => {
  let page: Angular2RealworldExampleAppMasterPage;

  beforeEach(() => {
    page = new Angular2RealworldExampleAppMasterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
