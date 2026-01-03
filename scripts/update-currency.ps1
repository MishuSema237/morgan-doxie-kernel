# PowerShell script to replace Naira symbols and Lagos references

$files = @(
    "c:\Users\HP\Desktop\MISHAEL_SEMA_EKOM\Tega\Pet-Sales-Website\app\reserve-puppy\page.tsx",
    "c:\Users\HP\Desktop\MISHAEL_SEMA_EKOM\Tega\Pet-Sales-Website\app\review-reservation\page.tsx",
    "c:\Users\HP\Desktop\MISHAEL_SEMA_EKOM\Tega\Pet-Sales-Website\app\reservation-confirmed\page.tsx",
    "c:\Users\HP\Desktop\MISHAEL_SEMA_EKOM\Tega\Pet-Sales-Website\app\select-puppy\page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file"
        
        # Read file content
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Replace Naira symbol with dollar
        $content = $content -replace '₦', '$'
        
        # Replace Lagos-specific text
        $content = $content -replace 'Lagos, Nigeria', 'Your Location'
        $content = $content -replace 'within Lagos', 'local delivery'
        $content = $content -replace 'outside Lagos', 'long distance delivery'
        $content = $content -replace 'pick up in Lagos', 'pick up locally'
        $content = $content -replace 'delivery within Lagos', 'local delivery'
        $content = $content -replace 'delivery outside Lagos', 'long distance delivery'
        $content = $content -replace "'en-NG'", "'en-US'"
        
        # Remove Lagos from state dropdown options
        $content = $content -replace '<option value="Lagos">Lagos</option>', ''
        
        # Write back
        Set-Content $file -Value $content -Encoding UTF8 -NoNewline
        
        Write-Host "✓ Updated: $file"
    } else {
        Write-Host "✗ Not found: $file"
    }
}

Write-Host "`nAll files processed!"
