export const countries = (name: string) => {
  switch (name) {
    case "Colombia":
      return (
        <img
          src="https://cdn.countryflags.com/thumbs/colombia/flag-400.png"
          alt="Colombia flag"
          width={16}
          height={16}
        />
      );
    case "Argentina":
      return (
        <img
          src="https://cdn.countryflags.com/thumbs/argentina/flag-400.png"
          alt="Argentina flag"
          width={16}
          height={16}
        />
      );
    case "Venezuela":
      return (
        <img
          src="https://cdn.countryflags.com/thumbs/venezuela/flag-400.png"
          alt="Venezuela flag"
          width={16}
          height={16}
        />
      );
    case "Mexico":
      return (
        <img
          src="https://cdn.countryflags.com/thumbs/mexico/flag-400.png"
          alt="Mexico flag"
          width={16}
          height={16}
        />
      );
    default:
      return (
        <img
          src="https://cdn.countryflags.com/thumbs/colombia/flag-400.png"
          alt="Colombia flag"
          width={16}
          height={16}
        />
      );
  }
};
