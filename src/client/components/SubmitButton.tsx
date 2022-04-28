import React from 'react';

type SubmitButtonProps = {
  title: string;
  label: string;
};

export const SubmitButton = ({ title, label }: SubmitButtonProps) => (
  <button className="fr-btn"
    type="submit"
    title={title}>{label}
  </button>
);
