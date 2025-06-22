function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^\w\s-]/g, "") // elimina caracteres especiais
    .replace(/\s+/g, "-") // substitui espaços por hífen "-"
    .replace(/-+/g, "-"); // substitui múltiplos hífen por um único
}

export default slugify;