import { Container } from '~/client/components/layouts/Container/Container';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

interface VideosCampagneApprentissageProps {
	videos: Array<VideoCampagneApprentissage>
}

export default function VideosCampagneApprentissage({ videos }: VideosCampagneApprentissageProps) {
	return <Container>
		<h2>Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?</h2>
		<section aria-labelledby="description-video">
			<p id="description-video">Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !</p>
			<ul>
				{
					videos.map((video, index) => (
						<li key={index}>{video.titre}</li>
					))
				}
			</ul>
		</section>
	</Container>;
}
