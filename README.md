# 🕹️ Retrokellari Tampereella (koneet.net)

Nykyaikainen, myyvä ja dynaaminen ländäri Tampereen Kalevassa sijaitsevalle **Retrokellarille**. Sivusto vakuuttaa kävijän nopeasti tilan aidolla tunnelmalla ja ohjaa tehokkaasti varaukseen.

Sivusto on 100 % staattinen (HTML5 + CSS3 + moderni Vanilla JS), erittäin nopea ja valmis julkaistavaksi suoraan **GitHub Pages** -palveluun.

---

## ✨ Tärkeimmät ominaisuudet

- 📺 **Hero aidolla tilakuvalla & syvyysparallaksilla:**
  - Taustalla Retrokellarin aito miljöö (`retrokellari-1.jpg`) elokuvamaisella tummennuksella ja sulavalla vierityksen syvyysvaikutelmalla.
- ⚡ **Nerokas 2-sliderin varausmoduli:**
  - Käyttäjä valitsee keston (3–8 h) ja henkilömäärän (2–12 hlö) sekä ajankohdan (Arkisin 50 €/h vs Viikonloppuisin 65 €/h).
  - Laskee ja näyttää välittömästi kokonaishinnan sekä **pärstäkohtaisen hinnan** (esim. 8 hengelle 3h viikonloppuna vain ~24 € / hlö).
  - "Siirry varaamaan" -painike vie suoraan yhteydenottolomakkeeseen esitäytetyillä tiedoilla.
- 🎨 **Värikoodattu konevalikoima (1px reunukset & vastaavat filtterinapit):**
  - **Pelikonsolit:** Hehkuva retrofuksia (`#ff2e88`)
  - **Kotitietokoneet (C64, Amiga...):** Sähköinen minttu (`#00f090`)
  - **PC & MikroMikot:** Cyber-syaani (`#00d4ff`)
  - **Vintage & Pong:** Lämmin arcade-kulta (`#ffb703`)
  - Sisältää reaaliaikaisen tekstihun sekä "+ Toivo tätä konetta" -pikalisäyksen varauspyyntöön.
- 🌊 **Vieritykseen liitetty animaatiologiikka:**
  - Parallaksi herolle ja pehmeä scroll-reveal -efekti korttien ja osioiden siirtymille.
- 📍 **Selkeät speksit, saapuminen ja nopea varaus:**
  - Sammonkatu 8, Kaleva, ratikka ja bussit.
  - Nopea varauspyyntö sähköpostilla (`info@koneet.net`) tai suoraan WhatsAppilla.

---

## 🚀 Paikallinen ajo

```bash
cd /Users/henriklindstrom/.gemini/antigravity-ide/scratch/retrokellari
npm run dev
```

Avaa selaimessa: `http://localhost:3000/`

Tuotantobuild (alle 100 ms):
```bash
npm run build
```

---

## 🌐 Julkaisu GitHub Pagesiin

1. Alusta git-repo ja puske koodi GitHubiin:
   ```bash
   git init
   git add .
   git commit -m "Retrokellari: myyvä ja dynaaminen ländäri"
   git branch -M main
   git remote add origin https://github.com/<kayttajatunnus>/<repo-nimi>.git
   git push -u origin main
   ```
2. GitHubissa (**Settings → Pages**):
   - Valitse lähteeksi **Deploy from a branch (main / root)** tai **GitHub Actions** (mukana `.github/workflows/deploy.yml`).
3. Sivusto on livenä osoitteessa `https://<kayttajatunnus>.github.io/<repo-nimi>/`.
