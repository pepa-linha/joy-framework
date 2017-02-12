# Joy JavaScript Framework
Joy je jednoduchý komponentový framework napsaný v TypeScript 2 určený pro webové prezentace, případně i jednoduché aplikace. Jeho cílem je vnést do kódu určitou logiku a dodržování struktury napříč celým projektem. Hlavními prvky frameworku jsou komponenty a služby.

## Jak začít
Nejprve je potřeba nainstalovat závislosti v podobě Node.js balíčků. To provedete příkazem

```
npm install
```

V balíčku jsou připravené spouštěcí skripty, všechny je lze nalézt v souboru `package.json` v sekci `scripts` nebo v terminálu příkazem `npm run`. Jde o skripty ke kompilaci, kompilaci pro produkční mód, server pro vývoj bez a s Hot Module Replacement. Nejvýhodnější je tedy spustit

```
npm run dev-server-hot
```

Automaticky se otevře ukázková stránky s použitím komponenty a služeb. **Ukázka vypisuje záměrně chybu do konzole se srozumitelnou chybovou hláškou** - chybí registrace služby do Dependency Injection (DI) kontejneru v souboru `bootstrap.ts`.

### src/App/bootstrap.ts
Místo, kde dochází ke spouštění aplikace. Je potřeba importovat všechny potřebné soubory, vytvořit instanci aplikace (samozřejmě je možné využít dědičnosti a vytvořit svou vlastní třídu pro aplikaci, která bude dědit od `joy.Application`) a té předat DI kontejner, ve kterém jsou (zatím ručně) přidané služby.

Následuje seznam importovaných komponent. To z toho důvodu, aby se objevily ve finálním souboru po kompilaci TypeScriptem. *Pokud je jiná a lepší možnost jak zahrnout nikde jinde nevyužívané třídy, které je potřeba mít ve finálním bundle souboru, dejte mi prosím vědět! :-)*

### První komponenta a @Component(...)
Práce s komponentama je ve frameworku velmi jednoduchá. Každou komponentu je doporučené umístit do samostatného souboru, který má shodný název s její třídou. Komponentu `MyComponent` tedy umístíme do souboru `MyComponent.ts` do složky `Component`. Každá komponenta musí dědit od `joy.Component` a implementovat její abstraktní metody `prepare` (voláno při vytváření) a `destroy` (voláno při rušení).

```
@Component("List")
```

Komponentu je třeba označit dekorátorem `@Component(...)`, který přijímá parametr název komponenty. Tento stejný název se pak nachází v HTML, tedy

```
<div component="List">...</div>
```

Každá komponenta má vazbu s tímto elementem, je uložena ve vlastnosti třídy `element`.

#### Životní cyklus komponenty
* `constructor(element: Element)`
* Injektování závislostí
* `prepare()`

#### Doporučení
Uvnitř metody `prepare` je vhodné psát základní inicializaci komponenty, například nastavení událostí k jednotlivým elementům.

Metody pro zpracování událostí nazývat s prefixem `handle` a tvořit je pomocí tzv. arrow functions pro zachování kontextu komponenty uvnitř těchto metod.

### Dependency Injection kontejner
Díky DI kontejneru je možné nastavit služby a přepsat tak výchozí chování frameworku. *Zatím to není 100%.*

Do kontejneru tedy registrujeme služby použité v aplikaci. Tyto služby jde jednoduše využívat v ostatních službách a komponentách pomocí dekorátoru `@Inject(...)`

#### @Inject()
Tak je možné automaticky injektovat závislost do komponenty, ale i služby. Jako parametr stačí uvést konstruktor služby. Příklad:

```
    @Inject(Logger)
    logger: Logger;
```

Do vlastnosti `logger` typu `Logger` je injektována služba `Logger` nebo služba, která ji rozšiřuje.

## API dokumentace
K frameworku je možné vygenerovat aktuální API dokumentaci. Před generováním nainstalujte globálně balíček `typedoc`

```
    npm install typedoc -g
```

a následně spusťte skript ke generování dokumentace

```
    npm run doc
```

Vygenerovaná dokumentace bude ve složce `.doc` v adresáři s projektem.