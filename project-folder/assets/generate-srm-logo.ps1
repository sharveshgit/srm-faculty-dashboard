# Generates a sample SRM logo PNG at assets/srm-logo.png
# Usage: Open PowerShell in this folder and run: .\generate-srm-logo.ps1

Add-Type -AssemblyName System.Drawing

$width = 400
$height = 120
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$bgColor = [System.Drawing.Color]::FromArgb(47,111,163)
$graphics.Clear($bgColor)

$font = New-Object System.Drawing.Font("Arial",48,[System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

# Draw centered text
$text = "SRM"
$size = $graphics.MeasureString($text, $font)
$x = ($width - $size.Width) / 2
$y = ($height - $size.Height) / 2
$graphics.DrawString($text, $font, $brush, $x, $y)

# Save PNG
$out = Join-Path -Path $PSScriptRoot -ChildPath "srm-logo.png"
$bitmap.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bitmap.Dispose()
Write-Host "Generated logo at: $out"