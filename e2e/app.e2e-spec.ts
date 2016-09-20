import { GvPage } from './app.po';

describe('gv App', function() {
  let page: GvPage;

  beforeEach(() => {
    page = new GvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
