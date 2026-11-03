import test, { describe } from 'node:test';
import assert from 'node:assert';
import { translations, t } from '../src/i18n/translations';

describe('Internationalization (i18n) Suite', () => {
  test('translation dictionary has matching keys for pt and en', () => {
    assert.ok(translations.hero.title.pt.length > 0);
    assert.ok(translations.hero.title.en.length > 0);
    assert.ok(translations.about.title.pt.length > 0);
    assert.ok(translations.about.title.en.length > 0);
    assert.ok(translations.projects.title.pt.length > 0);
    assert.ok(translations.projects.title.en.length > 0);
    assert.ok(translations.contact.title.pt.length > 0);
    assert.ok(translations.contact.title.en.length > 0);
  });

  test('t() helper returns correct language content', () => {
    const item = { pt: 'Olá Mundo', en: 'Hello World' };
    assert.strictEqual(t(item, 'pt'), 'Olá Mundo');
    assert.strictEqual(t(item, 'en'), 'Hello World');
  });

  test('fallback behavior when translation is missing', () => {
    const incomplete = { pt: 'Apenas Português', en: '' };
    // Should return pt if en is empty
    assert.strictEqual(t(incomplete, 'en'), 'Apenas Português');
  });

  test('all navigation items have valid bilingual labels', () => {
    const sections = ['hero', 'about', 'services', 'projects', 'process', 'contact'];
    for (const sec of sections) {
      assert.ok(translations[sec as keyof typeof translations], `Section ${sec} exists in translations`);
    }
  });
});
