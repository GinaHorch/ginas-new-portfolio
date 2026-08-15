# Diploma Practical Labs — evidence record

> **Purpose:** factual source for the hands-on component of the ICT50220 Diploma of
> Information Technology (Cyber Security & Business Analysis), EQC Institute.
>
> These labs are **not itemised on the certificate or the Record of Results**, which
> list units only. They are recorded here so that Skills-page levels citing hands-on
> lab work can be traced to something specific rather than asserted.

## Why this matters for skill levels

Before this record existed, Linux and Nmap sat at *currently developing* — active study
rather than delivered work — because the unit list showed no Linux or Nmap coverage.
The labs change that: they are hands-on work in a controlled environment, which meets
the definition of **practical experience** ("built or investigated with it hands-on")
on the Skills page.

They do **not** meet *production experience*, which is reserved for systems real people
depend on. A lab is not production.

## Environment setup

- macOS (ARM): UTM virtualisation; Kali Linux, Metasploitable, Windows 11 and Ubuntu VMs; Xcode toolchain
- Windows: VirtualBox; Kali Linux and Metasploitable setup; lab networking
- Lab test / assessed setup exercise

## Kali Linux

Intro to Kali Linux · analysing and managing the network · **Nmap scanning** · reverse
shell attack · password cracking · process management · Linux file permissions ·
firewall configuration

## Wireshark and network analysis

Wireshark setup (macOS) · packet-capture demonstration · DDoS lab setup (Windows 11) ·
observing distributed denial-of-service traffic

## Windows endpoint

Windows 11: IAM practical · network security endpoint practical
Windows 10: backup · backup to a network share · anti-malware scan and detection

## Application security

SIEM and SOC · access control models · role-based access control · software development
security · **OWASP Top 10** · application security testing

## Penetration testing (introductory, controlled lab)

SQL injection · reconnaissance and network mapping · OSINT reconnaissance ·
vulnerability scanning

**Framing constraint:** this is introductory, lab-based offensive-security work against
deliberately vulnerable targets (Metasploitable). It supports describing penetration
testing *fundamentals* at practical level. It does **not** support presenting Gina as a
penetration tester, or implying professional offensive-security engagements.

## AWS

- **IAM:** sign-in and setup · admin access account · adding permissions to an existing
  user · assigning roles · enabling MFA
- **Network security** and **VPN deployment**
- **Trusted Advisor**
- **Cloud console:** launching an EC2 instance · deploying an S3 bucket
- **Encryption:** encrypting an S3 bucket · encrypting an EC2 volume

## Cisco Packet Tracer

Setup · three graded network practicals · firewalls lab · access control lists · VPN
tunnels

## Level mapping applied to the Skills page

| Skill | Level | Evidence |
|---|---|---|
| Linux security fundamentals | practical | Kali labs: permissions, processes, firewall, network management |
| Nmap & network reconnaissance | practical | Nmap scanning, recon/network mapping |
| Wireshark & packet analysis | practical | Wireshark setup and capture, DDoS observation |
| Network security & firewalls | practical | Cisco Packet Tracer firewalls/ACLs/VPN, Kali firewall, AWS network security |
| Vulnerability management | practical | Vulnerability scanning lab |
| Encryption | practical | AWS S3 and EC2 volume encryption |
| Penetration testing fundamentals | practical | SQL injection, recon, OSINT, vulnerability scanning — controlled lab only |
| SIEM & SOC fundamentals | practical | SIEM and SOC lab |
| Application security (OWASP Top 10) | practical | OWASP Top 10 and application security labs |
| Identity & access management | practical | AWS IAM labs, Windows 11 IAM practical |
| Disaster recovery & continuity | practical | Windows 10 backup and network-share backup labs |
| AWS (IAM, EC2, S3, VPN, encryption) | practical | AWS lab series |
| Virtualisation for security labs | practical | UTM and VirtualBox, Kali/Metasploitable/Windows/Ubuntu VMs |

Threat data analysis, security architecture, incident response and security baselines
remain at **working knowledge** — covered by coursework units rather than by a lab.
