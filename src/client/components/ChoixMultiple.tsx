export interface ChoixMultipleValueObject {
  label: string
  value: string
}

interface ChoixMultipleProps {
  name: string;
  list: ChoixMultipleValueObject[];
}

export const ChoixMultiple = (props: ChoixMultipleProps) => {
  const { name, list } = props;

  return (
    <div className="fr-form-group">
      <fieldset className="fr-fieldset">
        <div className="fr-fieldset__content">
          {
            list.map(({ label, value }, index) => {
              return (
                <div key={index} className="fr-checkbox-group">
                  <input type="checkbox" id={`choix-multiple-${index}`} name={name} value={value} />
                  <label className="fr-label" htmlFor={`choix-multiple-${index}`}>{label}</label>
                </div>
              );
            })
          }
        </div>
      </fieldset>
    </div>
  );
};
