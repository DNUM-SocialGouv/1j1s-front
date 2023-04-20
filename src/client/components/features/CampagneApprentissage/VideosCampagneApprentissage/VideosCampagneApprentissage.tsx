import { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

import styles from './VideosCampagneApprentissage.module.scss';

interface VideosCampagneApprentissageProps {
	videos: Array<VideoCampagneApprentissage>
}

export default function VideosCampagneApprentissage({ videos }: VideosCampagneApprentissageProps) {
	const [videoToDisplay, setVideoToDisplay] = useState(videos.length > 0 ? videos[0] : null);
	if (!videoToDisplay) {
		return null;
	}

	return (
		<section className={styles.videos}>
			<Container className={styles.container}>
				<h2 className={styles.titreSection} id="titre-section-video" tabIndex={-1}>Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?</h2>
				<div className={styles.videoContainer}>
					<iframe
						width="326"
						height="180"
						src={`https://www.youtube-nocookie.com/embed/${videoToDisplay.videoId}`}
						title={videoToDisplay.titre}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className={styles.videoIframe}
					/>
				</div>
				<details className={styles.transcription}>
					<summary>Lire la transcription</summary>
					<p className={styles.transcriptionContent}>{videoToDisplay.transcription}</p>
				</details>
				<section className={styles.temoignage} aria-labelledby="description-video">
					<p className={styles.titreTemoignage} id="description-video">Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !</p>
					<ul>
						{
							videos.map((video, index) => (
								<li key={index}>
									<ButtonComponent
										label={video.titre}
										appearance={'tertiary'}
										onClick={() => {
											setVideoToDisplay(video);
											document.getElementById('titre-section-video')?.focus();
										}}
										aria-current={videoToDisplay === video ? true : undefined}
										className={styles.titreVideoButton}
										icon={
											videoToDisplay === video ?
												<Icon name="arrow-left"/> :
												<Icon name="play-circle"/>
										}
										iconPosition="left"
									/>
								</li>
							))
						}
					</ul>
				</section>
			</Container>
		</section>
	);
}
