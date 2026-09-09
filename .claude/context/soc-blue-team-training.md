# SOC / Blue Team Training — evidence record

> **Purpose:** factual source for the security-operations and digital-forensics skills
> shown in the **Security Operations & Forensics** group on `/skills`, and for the two
> credentials listed in `skills.certifications`.
>
> Same rule as `diploma-practical-labs.md`: a level cited here must trace to something
> specific. Hands-on lab or exam work is **practical experience**; topics covered as
> concepts rather than worked with are **working knowledge**.

## Framing constraint — read before writing copy

This is **structured training, not production SOC work**. Gina has not worked a SOC
shift, held an analyst rota, or triaged alerts for a real organisation.

Nothing from this record may be presented as:

- production experience (the Skills page reserves that for systems real people depend on);
- employment or engagement as a SOC analyst, incident responder or forensic examiner;
- evidence of professional incident-response casework.

It **does** support: hands-on tooling experience, blue-team methodology, and a
graded practical incident-response exam. That is worth stating plainly and is enough —
it does not need inflating.

## Credentials

| Credential | Issuer | Shape |
|---|---|---|
| SOC Level 1 Path — Certificate of Completion | TryHackMe | 14 modules, 65 hands-on labs, ~65 hours |
| Blue Team Level 1 (BTL1) — Certified | Security Blue Team / Centri | 6 domains, 24-hour practical incident-response exam |

BTL1's assessment is a graded practical exam against a live scenario, not a
multiple-choice test. That is the strongest single piece of evidence in this record and
is why incident response moves from *working knowledge* to *practical experience*.

## Coverage

### Alert triage, reporting and SOC operations

Alert triage and prioritisation · incident reporting using the "5 Ws" · SOC workbooks
and metrics · case management in **TheHive**

### SIEM investigation

Querying and alert triage in **Splunk** and the **Elastic Stack** · log correlation and
aggregation principles · **Sigma** detection rules

### Network and web traffic analysis

**Wireshark** packet operations and traffic analysis · **NetworkMiner** · **Snort** and
IDS fundamentals · detecting network discovery, data exfiltration and man-in-the-middle
activity · detecting web attacks, web shells and web DDoS

### Endpoint and OS-level threat detection

Windows and Linux logging and threat detection · **DeepBlueCLI** · **ProcDump** ·
Event Viewer · **JumpList Explorer** · **PECmd** · Windows File Analyzer

### Digital forensics

Chain of custody and evidence collection · memory analysis with **Volatility** · disk
analysis with **Autopsy**, **FTK Imager**, **KAPE** and **Scalpel** · browser history
analysis tools

### Phishing analysis

Header, URL and attachment investigation using **PhishTool**, **CyberChef**, **URL2PNG**
and **WannaBrowser**

### Threat intelligence

**MISP**, **OpenCTI**, **DomainTools**, **VirusTotal** · Pyramid of Pain · Cyber Kill
Chain · Unified Kill Chain · **MITRE ATT&CK** · operational, tactical and strategic
intelligence reporting

### Malware concepts

Malware classification · living-off-the-land techniques · introductory static and
behavioural analysis

### Incident response

The **PICERL** model — Preparation, Identification, Containment, Eradication, Recovery,
Lessons Learned — applied through case-based labs and the graded practical exam

### Capstone / applied scenarios

Multi-source investigation exercises correlating logs, pcaps, SIEM data and email
artefacts across a full incident lifecycle

## Level mapping applied to the Skills page

Tag names are capped at ~37 characters — Once UI's `Tag` is `white-space: nowrap`, and a
longer one pushes `/skills` past the 393px mobile viewport and fails the
no-horizontal-overflow test in `tests/mobile-navigation.spec.ts`. Tools that do not fit a
tag (ProcDump, KAPE, PECmd, JumpList Explorer, Windows File Analyzer, CyberChef, Scalpel,
URL2PNG, WannaBrowser, DomainTools, VirusTotal) are named in the group description on
`/skills` and in the Coverage section above instead of being dropped.

| Skill | Level | Evidence |
|---|---|---|
| Alert triage & prioritisation | practical | Triage labs across both paths; BTL1 exam |
| Incident response (PICERL) | practical | Case-based PICERL labs; 24-hour graded practical exam |
| Incident reporting & documentation | practical | "5 Ws" reporting exercises; exam report |
| SOC case management (TheHive) | practical | TheHive case-management labs; SOC workbooks and metrics |
| Splunk | practical | Querying and alert triage labs |
| Elastic Stack (Kibana) | practical | Querying and alert triage labs |
| Log correlation & SIEM investigation | practical | Correlation/aggregation labs; capstone scenarios |
| Sigma detection rules | practical | Sigma rule labs |
| Snort & IDS fundamentals | practical | Snort/IDS labs |
| Traffic analysis (NetworkMiner) | practical | NetworkMiner and pcap analysis labs |
| Network attack detection | practical | Network discovery, exfiltration and MITM detection labs |
| Web attack & web shell detection | practical | Web attack, web shell and web DDoS detection labs |
| Windows & Linux log analysis | practical | Windows/Linux logging and detection labs; Event Viewer |
| Endpoint detection (DeepBlueCLI) | practical | Tool-based endpoint detection labs; ProcDump |
| Windows forensic artefacts | practical | PECmd, JumpList Explorer, Windows File Analyzer labs |
| Memory analysis (Volatility) | practical | Volatility memory-analysis labs |
| Disk forensics (Autopsy, FTK Imager) | practical | Disk imaging and analysis labs; Scalpel carving |
| Evidence handling & chain of custody | practical | Evidence collection and custody exercises; KAPE collection |
| Phishing analysis (PhishTool) | practical | Header/URL/attachment labs; CyberChef, URL2PNG, WannaBrowser |
| Threat intelligence (MISP, OpenCTI) | practical | MISP and OpenCTI labs; DomainTools, VirusTotal enrichment |
| MITRE ATT&CK | practical | Technique mapping applied to lab artefacts |
| Multi-source incident investigation | practical | Capstone scenarios across logs, pcaps, SIEM and email |
| Cyber Kill Chain & Pyramid of Pain | working | Frameworks taught and discussed rather than tooled |
| Threat intelligence reporting | working | Operational/tactical/strategic reporting covered as theory |
| Malware classification | working | Concept coverage, not sample analysis at depth |
| Living-off-the-land techniques | working | Covered as technique awareness, not hands-on emulation |
| Static & behavioural malware analysis | working | Explicitly introductory |

## Consequential edits made elsewhere

Three entries left the **Cyber Security** group when this group was added, so the same
capability is not counted twice in the overview chart:

- `SIEM & SOC fundamentals` (was practical, from a single Diploma lab) — superseded by
  Splunk, Elastic Stack and log-correlation entries here.
- `Incident response & investigation` (was working, coursework only) — superseded by
  `Incident response (PICERL)` at practical, on the strength of the BTL1 exam.
- `Threat data analysis` (was working, coursework only) — superseded by the threat
  intelligence entries here.

`Wireshark & packet analysis` deliberately **stays** in Cyber Security rather than being
duplicated: it is already evidenced by the Diploma labs in `diploma-practical-labs.md`,
and `Network traffic analysis (NetworkMiner)` covers the addition this training makes.
