import { compile } from "path-to-regexp";
import urljoin from "url-join";
import queryString from "query-string";

export const Urls = {
  TOPIC_SUBSCIBE: "//iid.googleapis.com/iid/v1/:token/rel/topics/:topic"
};

export function getUrl(
  url = "",
  pathArgs = {},
  queryParams = {},
  encode = false
) {
  const compiledUrl = compile(url)(pathArgs);
  const serializedParams = queryString.stringify(queryParams, { encode });
  const delimeter = url.includes("?") ? "&" : "?";
  return serializedParams
    ? urljoin(`${compiledUrl}${delimeter}${serializedParams}`)
    : urljoin(compiledUrl);
}
