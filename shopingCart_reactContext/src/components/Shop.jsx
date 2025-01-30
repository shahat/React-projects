export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="product">
      { children }
      </ul>
    </section>
  );
}
