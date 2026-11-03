import test, { describe } from 'node:test';
import assert from 'node:assert';
import { navItems, categoryFilters } from '../src/data/navigation';
import { siteConfig } from '../src/data/site-config';

describe('Navigation & Site Configuration Suite', () => {
  test('navigation items list all essential sections', () => {
    const hrefs = navItems.map((n) => n.href);
    assert.ok(hrefs.includes('#about'), 'Has #about');
    assert.ok(hrefs.includes('#services'), 'Has #services');
    assert.ok(hrefs.includes('#projects'), 'Has #projects');
    assert.ok(hrefs.includes('#technologies'), 'Has #technologies');
    assert.ok(hrefs.includes('#contact'), 'Has #contact');
  });

  test('category filters include "all" and specific project types', () => {
    const values = categoryFilters.map((c) => c.value);
    assert.ok(values.includes('all'));
    assert.ok(values.includes('system'));
    assert.ok(values.includes('landing-page'));
    assert.ok(values.includes('website'));
    assert.ok(values.includes('automation'));
    assert.ok(values.includes('backend-api'));
  });

  test('site configuration does not have fictional email configured', () => {
    // When no email is explicitly provided by user, email should be empty string or undefined
    assert.ok(
      siteConfig.contact.email === '' || siteConfig.contact.email === undefined,
      'Email is cleanly empty when not provided, avoiding fake/invented addresses'
    );
  });

  test('contact details have valid real developer links', () => {
    assert.strictEqual(siteConfig.contact.github, 'julioccr160908-jpg');
    assert.strictEqual(siteConfig.contact.linkedin, 'julio-carneiro-dev');
    assert.ok(siteConfig.contact.whatsapp?.startsWith('55'), 'WhatsApp has country code');
  });
});
