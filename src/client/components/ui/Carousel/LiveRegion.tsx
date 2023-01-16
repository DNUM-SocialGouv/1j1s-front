export const LiveRegion = (props: { currentSlideIndex: number, numberOfImages: number }) => {
	const { currentSlideIndex, numberOfImages } = props;

	return (
		<div aria-live="polite" aria-atomic={true} className="sr-only">
			Image {currentSlideIndex + 1} sur {numberOfImages}
		</div>
	);
};
