import { Wallet } from 'lucide-react';

const CardPrice = ({ price }) => {
	return (
		price && (
			<div className="text-neutral-500 flex gap-1 items-center">
				<Wallet size={16} />
				{price?.min ? (
					<p className="text-xs leading-[11px] font-medium">
						Starting {price.min ? `${price.min}EGP` : "N/A"}
					</p>
				) : price ? (
					<p className="text-xs leading-[11px] font-medium">
						{price ? `${price}EGP` : "N/A"}
					</p>
				) : null}
			</div>
		)
	);
};

export default CardPrice;
