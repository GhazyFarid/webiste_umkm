const Dots = ({ total, current, onSelect }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onSelect(i)}
        aria-label={`Go to slide ${i + 1}`}
        className={`rounded-full transition-all duration-300 ${
          i === current
            ? "w-7 h-2.5 bg-primary"
            : "w-2.5 h-2.5 bg-black/50 hover:bg-black/80"
        }`}
      />
    ))}
  </div>
);

export default Dots;
