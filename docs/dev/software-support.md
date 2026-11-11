# Links from apps

Add the `app` query parameter to the software support URL to preselect the
project. For example:

```text
https://next.trainvent.com/software-support/?app=calcrow
```

Supported values are `stimmapp`, `calcrow`, `aperiodos`, `obsidian-sports`, and `stowgui`.
Values are case sensitive. Missing or unknown values leave the project
unselected. Visitors can change the selection before submitting.

The unlocalized URL redirects to the visitor's browser language (English if
unsupported), preserving the query string and fragment. Use a localized path
such as `/de/software-support/?app=calcrow` to choose the language explicitly.

When adding a project, update the options, all locale dictionaries, and the
`APPS` allowlist in `integrations/google-support/Code.gs`. Deploy a new version
of the Google script before publishing the website so submissions for the new
project are accepted.
