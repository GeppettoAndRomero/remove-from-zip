# Test fixture

`sample.zip` is generated in-repo (zip.js, `useUnicodeFileNames`) and contains a
few plain entries — `a.txt` (`alpha`), `b.txt` (`bravo`), a `docs/` folder with
`docs/guide.txt`, and a Japanese-named entry `写真/メモ.txt` — so the removal flow
can be exercised (deselect a file, deselect a folder, verify the rebuilt archive
keeps only the rest). No third-party content.
