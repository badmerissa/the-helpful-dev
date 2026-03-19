/**
 * JsonLd: Injects a JSON-LD structured data script into the page.
 *
 * SECURITY: `data` must always be a hardcoded static object.
 * Do NOT pass user input, URL params, or CMS content without
 * sanitising for HTML first — JSON.stringify does not escape
 * angle brackets, which would create an XSS vector.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
