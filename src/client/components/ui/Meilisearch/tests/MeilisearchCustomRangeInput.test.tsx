/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { MeilisearchCustomRangeInput } from '~/client/components/ui/Meilisearch/MeilisearchCustomRangeInput';


describe('MeilisearchCustomRangeInput', ()=> {
  it('monte le composant', ()=> {
    render(<MeilisearchCustomRangeInput attribute='test' label='test-label' placeholder='test-placeholder' unite='test-unité'/>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
