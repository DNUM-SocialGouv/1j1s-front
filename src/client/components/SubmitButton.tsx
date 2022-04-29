import React from 'react';

type SubmitButtonProps = {
  label: string;
};

export const SubmitButton = ({ label }: SubmitButtonProps) => (
  <button className="fr-btn fr-col--bottom" type="submit">
    {label}
  </button>
);
