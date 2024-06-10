// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
import { DOWNTIME_METRICS_IDS, EFFICIENCY_METRICS_IDS, LOSS_METRICS_IDS } from '../../src/app/utils/metrics';
import metrics from '../fixtures/metricsResponse.json';

describe("Home", () => {
  beforeEach(() => {
    cy.intercept('GET', '/metrics', { fixture: 'metricsResponse' }).as('fetchMetrics');
    cy.viewport('macbook-16').visit('/');
  });

  it("renders header", () => {
    cy.get('main').should('exist');
    cy.get('header').should('exist');
    cy.get('header').find('h1').should('contain', 'Metrics Dashboard');
  });

  describe("Charts", () => {
    it("renders charts", () => {
      cy.get('[data-cy="chart-card"]').should('have.length', 6);
      cy.get('[data-cy="chart-card"]').eq(0).find('svg').should('exist');
      cy.get('[data-cy="chart-card"]').eq(1).find('svg').should('exist');
      cy.get('[data-cy="chart-card"]').eq(2).find('svg').should('exist');
      cy.get('[data-cy="chart-card"]').eq(3).find('svg').should('exist');
      cy.get('[data-cy="chart-card"]').eq(4).find('svg').should('exist');
      cy.get('[data-cy="chart-card"]').eq(5).find('svg').should('exist');
    });

    it("renders efficiency charts correctly", () => {
      cy.get('[data-cy="chart-title"]').eq(0).should('have.text', 'Last sifht efficiency drop');
      // Labels
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', 'start');
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', 'cln_shift');
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', 'unexplained');
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', 'mech_problems');
      // Values
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', '100%');
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', '92.1%');
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', '91.5%');
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', '87.3%');
      // Metrics
      cy.get('[data-cy="chart-card"]').eq(0).find('text').should('contain', 'efficiency');

      cy.get('[data-cy="chart-title"]').eq(1).should('have.text', 'Total Working, Cleaning Shift time and Real Efficiency time');
      // Labels
      cy.get('[data-cy="chart-card"]').eq(1).find('text').should('contain', 'last shift');
      cy.get('[data-cy="chart-card"]').eq(1).find('text').should('contain', 'average shift');
      // Values
      cy.get('[data-cy="chart-card"]').eq(1).find('text').should('contain', '87.3%');
      cy.get('[data-cy="chart-card"]').eq(1).find('text').should('contain', '68%');
      // Metrics
      cy.get('[data-cy="chart-card"]').eq(1).find('text').should('contain', 'efficiency');
    });

    it("renders downtime charts correctly", () => {
      cy.get('[data-cy="chart-title"]').eq(2).should('have.text', 'Fully unproductive time');
      // Labels
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', 'Cleaning in shift');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', 'Mechanical problems');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', 'Unexplained downtime');
      // Values
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '2280s');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '1210s');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '180s');

      cy.get('[data-cy="chart-title"]').eq(3).should('have.text', 'Strict downtime');
      // Labels
      cy.get('[data-cy="chart-card"]').eq(3).find('text').should('contain', 'Mechanical problems');
      cy.get('[data-cy="chart-card"]').eq(3).find('text').should('contain', 'Unexplained downtime');
      // Values
      cy.get('[data-cy="chart-card"]').eq(3).find('text').should('contain', '1210s');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '180s');

      // Time toggle
      cy.get('[data-cy="time-measurment-toggle"]').click();

      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '0h 38m');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '0h 20m');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '0h 3m');

      cy.get('[data-cy="chart-card"]').eq(3).find('text').should('contain', '0h 20m');
      cy.get('[data-cy="chart-card"]').eq(2).find('text').should('contain', '0h 3m');
    });

    it("renders losses charts correctly", () => {
      cy.get('[data-cy="chart-title"]').eq(4).should('have.text', 'Equipment speed balance');
      // Labels
      cy.get('[data-cy="chart-card"]').eq(4).find('text').should('contain', 'Speed balance');
      // Values
      cy.get('[data-cy="chart-card"]').eq(4).find('text').should('contain', '32.81');
      cy.get('[data-cy="chart-card"]').eq(4).find('text').should('contain', '-10.5');
      // Metrics
      cy.get('[data-cy="chart-card"]').eq(4).find('text').should('contain', 'gain');
      cy.get('[data-cy="chart-card"]').eq(4).find('text').should('contain', 'loss');

      cy.get('[data-cy="chart-title"]').eq(5).should('have.text', 'Goods produced before reaching the palletizer');
      // Labels
      cy.get('[data-cy="chart-card"]').eq(5).find('text').should('contain', 'Goods before pallets');
      // Values
      cy.get('[data-cy="chart-card"]').eq(5).find('text').should('contain', '837.5');
      cy.get('[data-cy="chart-card"]').eq(5).find('text').should('contain', '-268');
      // Metrics
      cy.get('[data-cy="chart-card"]').eq(5).find('text').should('contain', 'gain');
      cy.get('[data-cy="chart-card"]').eq(5).find('text').should('contain', 'loss');
    });
  });

  describe("Table", () => {
    const columns = ['Label', 'Description', 'Category', 'Value'];

    beforeEach(() => {
      cy.wait(500);
    });

    it("render tables correctly", () => {
      cy.get('button:visible:contains("Show table")').eq(0).click();

      cy.get('[data-cy="modal"]').should('be.visible')

      columns.forEach((column) => {
        cy.contains('th', column).should('be.visible');
      });

      metrics.filter((metric) => EFFICIENCY_METRICS_IDS.includes(metric.id)).forEach((metric) => {
        cy.contains('td', metric.label).should('be.visible');
        cy.contains('td', metric.description).should('be.visible');
        cy.contains('td', metric.category).should('be.visible');
        cy.contains('td', metric.value).should('be.visible');
      });

      cy.get('[data-cy="modal-header"]').find('svg').click();

      cy.get('button:visible:contains("Show table")').eq(1).click();

      cy.get('[data-cy="modal"]').should('be.visible')

      columns.forEach((column) => {
        cy.contains('th', column).should('be.visible');
      });

      metrics.filter((metric) => DOWNTIME_METRICS_IDS.includes(metric.id)).forEach((metric) => {
        cy.contains('td', metric.label).should('be.visible');
        cy.contains('td', metric.description).should('be.visible');
        cy.contains('td', metric.category).should('be.visible');
        cy.contains('td', metric.value).should('be.visible');
      });

      cy.get('[data-cy="modal-header"]').find('svg').click();

      cy.get('button:visible:contains("Show table")').eq(2).click();

      cy.get('[data-cy="modal"]').should('be.visible')

      columns.forEach((column) => {
        cy.contains('th', column).should('be.visible');
      });

      metrics.filter((metric) => LOSS_METRICS_IDS.includes(metric.id)).forEach((metric) => {
        cy.contains('td', metric.label).should('be.visible');
        cy.contains('td', metric.description).should('be.visible');
        cy.contains('td', metric.category).should('be.visible');
        cy.contains('td', metric.value).should('be.visible');
      });
    });
  });
});