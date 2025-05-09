import FeteDesMetiersBanner from './FeteDesMetiers';
import StageDeSecondeBanner from './StageDeSeconde';
import WorldSkillsBanner from './WorldSkills';


export default function Bannieres() {
	return (
		<>
			{process.env.NEXT_PUBLIC_FETE_DE_METIERS_CAMPAGNE === '1' && <FeteDesMetiersBanner />}
			{process.env.NEXT_PUBLIC_STAGES_SECONDE_FEATURE === '1' && <StageDeSecondeBanner />}
			{process.env.NEXT_PUBLIC_WORLD_SKILLS_FEATURE === '1' && <WorldSkillsBanner />}
		</>
	);
}
