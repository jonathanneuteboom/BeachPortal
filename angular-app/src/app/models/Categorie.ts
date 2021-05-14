export enum Categorie {
  Heren,
  Dames,
  Mix
}

export class CategorieHelper {
  public static getAllCategorien(): any {
    return Object.values(Categorie)
      .filter((c) => !isNaN(Number(c)))
      .map((c) => {
        return { value: c, viewValue: Categorie[c] };
      });
  }
}
