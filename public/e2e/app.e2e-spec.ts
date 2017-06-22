import { ObservabletestPage } from './app.po';

describe('observabletest App', function() {
  let page: ObservabletestPage;

  beforeEach(() => {
    page = new ObservabletestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
