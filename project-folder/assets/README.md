Place your logo image at `assets/srm-logo.png`.

The HTML includes a fallback to `assets/srm-logo.svg` if the PNG is not found.

Files created:
- index.html
- styles.css
- assets/srm-logo.svg

You can replace `srm-logo.svg` with a real PNG named `srm-logo.png`.
Or run the included PowerShell script to generate a sample PNG:

```powershell
cd assets
.\generate-srm-logo.ps1
```

This creates `assets/srm-logo.png` using System.Drawing.