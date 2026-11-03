import test, { describe } from 'node:test';
import assert from 'node:assert';
import { projects, getProjectById, getFeaturedProjects, getProjectsByCategory } from '../src/data/projects';
import type { ProjectDemo } from '../src/types';

describe('Projects & Demos Data Suite', () => {
  test('all registered projects have required fields and non-empty titles', () => {
    assert.strictEqual(projects.length, 6);

    for (const p of projects) {
      assert.ok(p.id, `Project has id`);
      assert.ok(p.title.pt, `Project ${p.id} has pt title`);
      assert.ok(p.title.en, `Project ${p.id} has en title`);
      assert.ok(p.coverImage.startsWith('/images/projects/'), `Project ${p.id} has coverImage in /images/projects/`);
      assert.ok(p.technologies.length > 0, `Project ${p.id} has at least one technology`);
      assert.ok(p.caseStudy.challenge.pt, `Project ${p.id} has challenge description`);
      assert.ok(p.caseStudy.solution.pt, `Project ${p.id} has solution description`);
      assert.ok(p.caseStudy.features.length > 0, `Project ${p.id} has features`);
    }
  });

  test('demonstration types conform to discriminated union', () => {
    for (const p of projects) {
      const demo: ProjectDemo = p.demo;
      switch (demo.type) {
        case 'iframe':
          assert.ok(demo.url.startsWith('https://'), `Project ${p.id} iframe demo has valid https URL: ${demo.url}`);
          break;
        case 'component':
        case 'simulation':
          assert.ok(
            demo.component === 'FleetManagementDemo' || demo.component === 'WhatsAppAutomationDemo',
            `Project ${p.id} has a registered component: ${demo.component}`
          );
          break;
        case 'gallery':
          assert.ok(Array.isArray(demo.images), `Project ${p.id} gallery demo has images array`);
          break;
        case 'none':
          // Valid none type for projects without sandbox
          break;
        default:
          assert.fail(`Unknown demo type on project ${p.id}`);
      }
    }
  });

  test('getProjectById retrieves correct project', () => {
    const barberhost = getProjectById('barberhost');
    assert.ok(barberhost);
    assert.strictEqual(barberhost?.id, 'barberhost');
    assert.strictEqual(barberhost?.category, 'system');

    const nonExistent = getProjectById('non-existent-project');
    assert.strictEqual(nonExistent, undefined);
  });

  test('getFeaturedProjects returns only featured projects ordered by order property', () => {
    const featured = getFeaturedProjects();
    assert.ok(featured.length > 0);
    for (const p of featured) {
      assert.strictEqual(p.featured, true);
    }
    // Verify ascending order
    for (let i = 0; i < featured.length - 1; i++) {
      assert.ok(featured[i].order <= featured[i + 1].order);
    }
  });

  test('getProjectsByCategory filters correctly and supports "all"', () => {
    const all = getProjectsByCategory('all');
    assert.strictEqual(all.length, projects.length);

    const systems = getProjectsByCategory('system');
    assert.ok(systems.length >= 2);
    for (const s of systems) {
      assert.strictEqual(s.category, 'system');
    }

    const automations = getProjectsByCategory('automation');
    assert.strictEqual(automations.length, 1);
    assert.strictEqual(automations[0].id, 'whatsapp-automation');
  });

  test('all project links point to secure HTTPS destinations', () => {
    for (const p of projects) {
      if (p.links.live) {
        assert.ok(p.links.live.startsWith('https://'), `Live link for ${p.id} is HTTPS`);
      }
      if (p.links.demo) {
        assert.ok(p.links.demo.startsWith('https://'), `Demo link for ${p.id} is HTTPS`);
      }
    }
  });
});
